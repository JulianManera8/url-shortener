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

    console.log(user)

    const fullname = 
      user.app_metadata.provider === 'google' ? 
      user?.user_metadata.full_name :
      user.app_metadata.provider === 'github' ?
      user?.user_metadata.user_name :
      user?.user_metadata.fullname

    if(fullname) {
      const formated = fullname
        .split(' ')
        .map( word => word.charAt(0).toUpperCase())
        .join('');

      return formated
    }

    
  } 
  
  const avatarPicture = () => {
    const picture = 
    user.app_metadata.provider === 'google' ?
    user?.user_metadata.picture :
    user.app_metadata.provider === 'github' ?
    user?.user_metadata?.avatar_url :
    ''

    return picture ? picture : ''

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
                <Avatar className="w-[70px] h-[70px] md:w-16 md:h-16 -mr-2 -md:mr-2">
                  <AvatarImage src={ avatarPicture() ? avatarPicture() : AvatarFB() } className="object-fill" />
                  <AvatarFallback className="text-xl font-serif">{AvatarFB()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <span className="capitalize text-lg md:text-xl"> {
                    user.app_metadata.provider === 'google' ? 
                    user?.user_metadata.full_name :
                    user.app_metadata.provider === 'github' ?
                    user?.user_metadata.user_name :
                    user?.user_metadata.fullname  
                  } </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/" className="flex text-md md:text-xl items-center">
                    <House className="mr-3" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex text-md md:text-xl items-center">
                    <LinkIcon className="mr-3" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 text-md md:text-xl items-center">
                  <LogOut className="mr-3" />
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
