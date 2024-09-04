import {UAParser} from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("urls_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

const parser = new UAParser();

export const storeClicks = async ({id, originalUrl}) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country} = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      urls_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};