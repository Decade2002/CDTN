import React from "react";
import Navbar from "@/components/Navbar";
import "../styles/global.css"
import Footer from "@/components/Footer";

export default function Layout({ children } : { children: React.ReactNode }) {
    return(
        <html lang="vn">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet"></link>
            </head>
            <body>
                <Navbar/>
                <main>
                    { children }
                </main>
                <Footer></Footer>
            </body>
        </html>
    )
}