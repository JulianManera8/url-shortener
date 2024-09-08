import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/COMPONENTS/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from '../COMPONENTS/login'
import Signup from '../COMPONENTS/signup'
import { useEffect } from "react";
import { UrlState } from "@/context";


export default function Auth() {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew')

  const navigate = useNavigate()

  const { isAuth, loading} = UrlState();
  
  useEffect(() => {
    if(isAuth && !loading) navigate(`/dashboard?${longLink ? 'createNew=${longLink}' : ''}`);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, loading])
  

  return (
    <div className="mt-8 flex flex-col  items-center gap-10 px-4  max-w-[400px] mx-auto">
  
      {searchParams.get("createNew") 
        ? ( <h1 className="text-3xl font-extrabold text-center">Hold up, you have to login first!</h1> ) 
        : ( <h1 className="text-4xl sm:text-5xl font-extrabold text-center">Login / Sign Up</h1> )
      }
  
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="signip">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Login />
        </TabsContent>
        <TabsContent value="signip">
          <Signup />
        </TabsContent>
      </Tabs>
  
    </div>
  );
  
}
