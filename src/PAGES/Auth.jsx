import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from '../components/login'
import Signup from '../components/signup'
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
    <div className="mt-8 flex flex-col items-center gap-10">

      {searchParams.get("createNew") 
      ? ( <h1 className="text-3xl font-extrabold"> Hold up, you have to login first!</h1> ) 
      : ( <h1 className="text-5xl font-extrabold"> Login / Sign Up </h1> )
      }

      <Tabs defaultValue="account" className="w-[400px]">
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
