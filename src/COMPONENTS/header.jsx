import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const user = true;

  return (
    <nav className="flex justify-between items-center mt-3">
      <Link to="/">
        <img className="h-20" src="/logo.png" alt="Trimrr logo" />
      </Link>

      <div className=" px-3">
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Button</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Julian Manera</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="mr-2"/>
                My Links
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2"/>
                LogOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
