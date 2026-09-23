
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Testimonials = () => {
        const testimonials = [
            {
                name: "Aarav Sharma",
                role: "Student",
                image: "https://randomuser.me/api/portraits/men/11.jpg",
                text: "The courses are easy to understand and the instructors explain everything clearly.",
            },
            {
                name: "Sophia Williams",
                role: "Student",
                image: "https://randomuser.me/api/portraits/women/21.jpg",
                text: "I learned practical skills that helped me improve my career. Highly recommended!",
            },
            {
                name: "Michael Brown",
                role: "Student",
                image: "https://randomuser.me/api/portraits/men/52.jpg",
                text: "A great platform for learning new skills from home.",
            },
        ];
  return (
    <div>
              {/* TESTIMONIALS */}
                  <section className="bg-gray-50 py-20">
      
                      <div className="mx-auto max-w-7xl px-6 lg:px-10">
      
                          <div className="mb-12 text-center">
      
                              <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                                  Testimonials
                              </p>
      
                              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                  Our Students Say!
                              </h2>
      
                          </div>
      
                          <div className="grid gap-7 md:grid-cols-3">
      
                              {testimonials.map((testimonial) => (
      
                                  <div
                                      key={testimonial.name}
                                      className="relative bg-white p-7 shadow-sm transition hover:shadow-lg"
                                  >
      
                                      <div className="text-5xl leading-none text-[#06a7d9]">
                                          "
                                      </div>
      
                                      <p className="mt-3 leading-7 text-gray-500">
                                          {testimonial.text}
                                      </p>
      
                                      <div className="mt-6 flex items-center gap-4">
      
                                          <img
                                              src={testimonial.image}
                                              alt={testimonial.name}
                                              className="h-14 w-14 rounded-full object-cover"
                                          />
      
                                          <div>
      
                                              <h4 className="font-bold">
                                                  {testimonial.name}
                                              </h4>
      
                                              <p className="text-sm text-gray-500">
                                                  {testimonial.role}
                                              </p>
      
                                          </div>
      
                                      </div>
      
                                  </div>
      
                              ))}
      
                          </div>
      
                      </div>
      
                  </section>
      
      
    </div>
  )
}

export default Testimonials
