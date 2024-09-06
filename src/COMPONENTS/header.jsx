/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation()

  const { user, fetchUser } = UrlState();

  useEffect(() => {
    fetchUser()
  }, [user])

  const AvatarFB = () => {
    let fullname = user?.user_metadata?.fullname.split(' ')
    let formated = ''
    

    if (fullname.length > 1) {
      formated = fullname.map( word => {
        return word.charAt(0).toUpperCase();
      })
      return formated.join('')
    } 

    formated = fullname[0].charAt(0).toUpperCase()

    return formated
  }




  return (
    <>
      <nav className="flex justify-between items-center mt-3">
        <Link to="/">
          <img className="h-[85px]" src="/logo.png" alt="Trimrr logo" />
        </Link>

        <div className=" px-3">
          {!user ? (
            location.pathname !== '/auth' ? <Button onClick={() => navigate("/auth")}>Log in</Button> 
            : <Button onClick={() => navigate("/")} variant="secondary"> Back to home </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={ user?.user_metadata?.profile_pic ? user?.user_metadata?.profile_pic : AvatarFB() } className="object-fill" />
                  <AvatarFallback>{AvatarFB()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <span className="capitalize text-xl"> {user?.user_metadata?.fullname} </span>
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
