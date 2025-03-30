import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/api/portfolio";
import { UserContext } from "@/context/UserContext";
import { Portfolio } from "@/types/Portfolio";
import { usePortfolio } from "@/context/PortfolioContext";

const UserGallery = () => {
  const { portfolio } = usePortfolio();

  return (
    <div className="flex-1 flex gap-4 justify-around flex-wrap">
      {portfolio.map((proj) => (
        <div
          key={proj.id}
          className="lg:w-[33%] md:w-[70%] rounded-md h-full shadow-xl text-center my-5"
        >
          <Image
            src={
              proj.imageUrl
                ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${proj.imageUrl}`
                : "/avatar.png"
            }
            alt="project"
            width={1500}
            height={1500}
            className="w-full h-[50%]"
          />
          <h1 className="text-lamagreen text-xl my-2">{proj.name}</h1>
          <p className="text-sm text-slate-600 mx-2 my-2">{proj.description}</p>
          <div className="bg-lamagreen rounded-md w-[69%] text-center my-3 text-slate-100 mx-auto">
            <Link target="_blank" href={proj.projectUrl}>
              انتقل إلى مصدر المشروع
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGallery;
