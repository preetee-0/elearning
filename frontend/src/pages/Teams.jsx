import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaLinkedinIn, } from "react-icons/fa";

const Teams = () => {
    
    const instructors = [
        {
            name: "John Doe",
            role: "Web Developer",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Sarah Smith",
            role: "Graphic Designer",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "David Wilson",
            role: "Digital Marketer",
            image: "https://randomuser.me/api/portraits/men/46.jpg",
        },
        {
            name: "Emily Brown",
            role: "UI/UX Designer",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
    ];

  return (
   <>
                  <section className="py-20">
      
                      <div className="mx-auto max-w-7xl px-6 lg:px-10">
      
                          <div className="mb-12 text-center">
      
                              <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                                  Instructors
                              </p>
      
                              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                  Expert Instructors
                              </h2>
      
                          </div>
      
                          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      
                              {instructors.map((instructor) => (
      
                                  <div
                                      key={instructor.name}
                                      className="group overflow-hidden bg-white text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                  >
      
                                      <div className="overflow-hidden">
      
                                          <img
                                              src={instructor.image}
                                              alt={instructor.name}
                                              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                                          />
      
                                      </div>
      
                                      <div className="p-5">
      
                                          <h3 className="text-lg font-bold">
                                              {instructor.name}
                                          </h3>
      
                                          <p className="mt-1 text-sm text-[#06a7d9]">
                                              {instructor.role}
                                          </p>
      
                                          <div className="mt-4 flex justify-center gap-4 text-gray-400">
      
                                              <FaFacebookF className="cursor-pointer transition hover:text-[#06a7d9]" />
      
                                              <FaTwitter className="cursor-pointer transition hover:text-[#06a7d9]" />
      
                                              <FaLinkedinIn className="cursor-pointer transition hover:text-[#06a7d9]" />
      
                                          </div>
      
                                      </div>
      
                                  </div>
      
                              ))}
      
                          </div>
      
                      </div>
      
                  </section>
      </>
  )
}

export default Teams
