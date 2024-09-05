/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/COMPONENTS/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/COMPONENTS/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/COMPONENTS/ui/avatar";
import { LinkIcon, LogOut, House } from "lucide-react";
import useFetch from "@/HOOKS/use-fetch";
import { UrlState } from "@/context";
import { BarLoader } from "react-spinners";
import {logout} from '../DATABASE/apiAuth'
import { useEffect } from "react";

export default function Header() {
  const {loading, fn: fnLogout } = useFetch(logout)
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  useEffect(() => {
    fetchUser()
  }, [user])

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
          <img className="h-[85px]" src="/logo.png" alt="Trimrr logo" />
        </Link>

        <div className=" px-3">
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Log in</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user?.user_metadata?.profile_pic} className="object-fit" />
                  <AvatarFallback>{AvatarFB()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <span className="capitalize text-xl"> {user?.user_metadata?.fullname.split(" ")[0]} </span>
                  <span className="capitalize text-xl"> {user?.user_metadata?.fullname.split(" ")[1]} </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/" className="flex text-xl">
                    <House className="mr-2" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex text-xl">
                    <LinkIcon className="mr-2" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 text-xl">
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
