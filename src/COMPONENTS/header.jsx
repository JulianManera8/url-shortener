import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import useFetch from "@/HOOKS/use-fetch";
import { UrlState } from "@/context";
import { BarLoader } from "react-spinners";
import {logout} from '../DATABASE/apiAuth'

export default function Header() {
  const navigate = useNavigate();

  const { user } = UrlState();

  const {loading, fn: fnLogout } = useFetch(logout)

  const AvatarFB = () => {
    let firstLetter = user?.user_metadata?.fullname.split(' ')[0]
    let secondLetter = user?.user_metadata?.fullname.split(' ')[1]

    let finalFB = firstLetter.charAt(0).toUpperCase() + secondLetter.charAt(0).toUpperCase()

    return finalFB
  }


  return (
    <>
      <nav className="flex justify-between items-center mt-3">
        <Link to="/">
          <img className="h-16" src="/logo.png" alt="Trimrr logo" />
        </Link>

        <div className=" px-3">
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Log in</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} />
                  <AvatarFallback>{AvatarFB()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <span className="capitalize"> {user?.user_metadata?.fullname.split(" ")[0]} </span>
                  <span className="capitalize"> {user?.user_metadata?.fullname.split(" ")[1]} </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon className="mr-2" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2" />
                  <span onClick={() => {
                    fnLogout().then(() => {navigate('/')})
                  }}> 
                  LogOut
                  </span>

                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
}
