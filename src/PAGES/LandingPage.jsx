import { Button } from "@/COMPONENTS/ui/button";
import { Input } from "@/COMPONENTS/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"

import {useState} from 'react'
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
    const [longUrl, setLongUrl] = useState('')
    const navigate = useNavigate()
    
    const handleShorten = (e) => {
        e.preventDefault();

        if (longUrl) {
          const encodedUrl = encodeURIComponent(longUrl);  // Codifica la URL aquí
          navigate(`/dashboard?createNew=${encodedUrl}`);
      }
    }

    return (
      <div className="flex flex-col items-center">
        <h2 className="my-10 sm:my-16 text-2xl sm:text-3xl lg:text-5xl text-white text-center font-extrabold">
          The only URL Shortener <br /> you will ever need! 👇
        </h2>

        <form 
          className="sm:h-14 flex flex-col sm:flex-row w-full gap-2 md:px-11"
          onSubmit={handleShorten}
        >
          <Input 
          type="url" 
          placeholder="Enter your loooong URL" 
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          id="longUrl"
          />
          <Button> Make it Shorter! </Button>
        </form>
        <img
          src="/banner1.jpg"
          alt="banner"
          className="w-full my-11 md:px-11"
        />

        <Accordion type="multiple" className=" w-full text-left">

          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Do i need to create an account to use the app?</AccordionTrigger>
            <AccordionContent>
            Yes, Creating an account allows you to manage your URLs, view analytics, and customize your short URLs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What analytics are available?</AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks and device types (mobile or desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    );
}