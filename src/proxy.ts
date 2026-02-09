//هو طبقة حماية بيني و بين السيرفر بحيث محجث يقدر يعمل routes من ال url 
//Middleware same as proxy
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//الفحات الي عايزه احميها
const protectedPages = ['/cart','/Address','/wishlist','/allorders','/']
//الصفحات الي مش هيرجع لها لو عامل لوجن او عنده توكن
const authPages = ['/login','/register']

export default async function proxy(req:NextRequest){
//تستخدم فقط لو معايا ريكويست
  const token = await  getToken({req})

  if(protectedPages.includes(req.nextUrl.pathname)){
    if(token){
        //will go to page i requested
        return NextResponse.next()
    }
    else{
        //create the url 
        const redirectUrl = new URL('/login',process.env.NEXT_URL)
        return NextResponse.redirect(redirectUrl)
    }
  }
  if(authPages.includes(req.nextUrl.pathname)){
    if(!token){
        return NextResponse.next()
    }
    else{
        const redirectUrl = new URL('/',process.env.NEXT_URL)
        return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()

}