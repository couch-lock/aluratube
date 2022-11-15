import { createClient } from "@supabase/supabase-js";

const project_url = "https://srzkxpxewblmwcbunabn.supabase.co";
const public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyemt4cHhld2JsbXdjYnVuYWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTk2MTAsImV4cCI6MTk4NDAzNTYxMH0.Sb12VD2vh1zdt3Urvrmm8i0DrwQAgujKY0d51tvwr_g";
const supabase = createClient(project_url, public_key);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}