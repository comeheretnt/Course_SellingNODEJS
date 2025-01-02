import React from "react";
import { call, mail, map } from "../../constant/images";
import ContactForm from "../ContactForm";
import Footer from "../HomeComponents/Footer";
import Header from "../HomeComponents/Header";


const ContactUs = () => {
  return (
    <>
      <Header />
      <div class="nav-tab-wrapper tabs  section-padding">
        <div class="container">
          <div class=" grid grid-cols-12 gap-[30px]">
            <div class="xl:col-span-5 lg:col-span-6 col-span-12 ">
              <div class="mini-title">Contact Us</div>
              <h4 class="column-title ">
                Get In Touch <span class="shape-bg">Today</span>
              </h4>
              <div>
              "We’re here to assist you. Feel free to contact us with any questions or course inquiries. Our team will respond as soon as possible."


              </div>
              <ul class=" list-item space-y-6 pt-8">
                <li class="flex">
                  <div class="flex-none mr-6">
                    <div class="">
                      <img src={mail} alt="" class="" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <h4 class=" lg:text-xl text-lg mb-1">Email-Us :</h4>
                    <div>EduMarket@gmail.com</div>
                  </div>
                </li>
                <li class="flex">
                  <div class="flex-none mr-6">
                    <div class="">
                      <img src={call} alt="" class="" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <h4 class=" lg:text-xl text-lg mb-1">Call Us:</h4>
                    <div>+88012 2910 1781</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="xl:col-span-7 lg:col-span-6 col-span-12">
              <div class="bg-white shadow-box7 p-8 rounded-md">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
