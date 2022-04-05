import { useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router'

import { UserContext } from "../contexts/UserContext";
import LoginForm from "../components/login-page/LoginForm";

const Home: NextPage = () => {
  const router = useRouter()
  const { username } = useContext(UserContext);

  if(username){
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>Welcome to Clocket</title>
      </Head>

      <div className="hero h-full my-auto">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Welcome to Clocket</h1>
            <p className="py-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium dolor aliquam architecto pariatur odit numquam
              adipisci suscipit eos corporis voluptatibus ea temporibus libero
              officiis dolorem neque, quidem quisquam soluta ut?
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
