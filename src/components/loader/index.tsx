'use client'
import { useEffect } from "react";

export default function Loading() {
    //console.log('Loading...');
    useEffect(() => {
        console.log('Loading...');
    }, []);

    return (
        <h3 className="flex justify-center items-center mt-24">Loading...</h3>
    );
  }