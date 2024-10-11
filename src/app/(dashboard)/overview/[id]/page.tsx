"use client";

import React, { useEffect, useRef, useState } from "react";
import { DeleteIcon, LucideDelete, Trash2 } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import AboutUser from "@/components/organisms/Overview/AboutUser";
import Modal from "@/components/molecules/Modals/ModalBackground";
import DeleteModal from "@/components/molecules/Modals/DeleteModal/DeleteModal";
import { Button,  } from "@chakra-ui/react";
import { useQueryClient,useQuery } from "@tanstack/react-query";
import useStudents from "@/hooks/useStudents";

const SingleUser = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const typeRef = useRef<"delete" | "update">("delete");
  const params = useParams()
  const {getSingleStudent ,data} = useStudents();
 useEffect(()=>{
getSingleStudent(params.id)
 },[])

  console.log(data)
  return (
    <section className="">
      <div className="mb-4 flex flex-col gap-y-3 lg:gap-y-0 lg:items-center justify-between lg:flex-row">
        <div className="flex items-center justify-between lg:justify-start gap-x-2">
          <svg
            onClick={() => router.back()}
            className="cursor-pointer"
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.0613 25.4388C21.3431 25.7205 21.5014 26.1027 21.5014 26.5013C21.5014 26.8998 21.3431 27.282 21.0613 27.5638C20.7795 27.8455 20.3973 28.0039 19.9988 28.0039C19.6003 28.0039 19.2181 27.8455 18.9363 27.5638L8.9363 17.5638C8.79646 17.4244 8.6855 17.2588 8.6098 17.0765C8.53409 16.8942 8.49512 16.6987 8.49512 16.5013C8.49512 16.3038 8.53409 16.1084 8.6098 15.926C8.6855 15.7437 8.79646 15.5781 8.9363 15.4388L18.9363 5.43875C19.2181 5.15696 19.6003 4.99865 19.9988 4.99865C20.3973 4.99865 20.7795 5.15696 21.0613 5.43875C21.3431 5.72054 21.5014 6.10274 21.5014 6.50125C21.5014 6.89977 21.3431 7.28196 21.0613 7.56375L12.125 16.5L21.0613 25.4388Z"
              fill="black"
            />
          </svg>
          <div className="flex items-center  gap-x-2.5">
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_7171_64383)">
                <path
                  d="M19.0001 10.5C19.0001 10.1022 19.1582 9.72064 19.4395 9.43934C19.7208 9.15804 20.1023 9 20.5001 9H30.5001C30.898 9 31.2795 9.15804 31.5608 9.43934C31.8421 9.72064 32.0001 10.1022 32.0001 10.5C32.0001 10.8978 31.8421 11.2794 31.5608 11.5607C31.2795 11.842 30.898 12 30.5001 12H20.5001C20.1023 12 19.7208 11.842 19.4395 11.5607C19.1582 11.2794 19.0001 10.8978 19.0001 10.5ZM30.5001 15H20.5001C20.1023 15 19.7208 15.158 19.4395 15.4393C19.1582 15.7206 19.0001 16.1022 19.0001 16.5C19.0001 16.8978 19.1582 17.2794 19.4395 17.5607C19.7208 17.842 20.1023 18 20.5001 18H30.5001C30.898 18 31.2795 17.842 31.5608 17.5607C31.8421 17.2794 32.0001 16.8978 32.0001 16.5C32.0001 16.1022 31.8421 15.7206 31.5608 15.4393C31.2795 15.158 30.898 15 30.5001 15ZM30.5001 21H23.5001C23.1023 21 22.7208 21.158 22.4395 21.4393C22.1582 21.7206 22.0001 22.1022 22.0001 22.5C22.0001 22.8978 22.1582 23.2794 22.4395 23.5607C22.7208 23.842 23.1023 24 23.5001 24H30.5001C30.898 24 31.2795 23.842 31.5608 23.5607C31.8421 23.2794 32.0001 22.8978 32.0001 22.5C32.0001 22.1022 31.8421 21.7206 31.5608 21.4393C31.2795 21.158 30.898 21 30.5001 21ZM19.4526 24.125C19.5019 24.3157 19.5131 24.5143 19.4856 24.7094C19.4581 24.9045 19.3924 25.0922 19.2924 25.2619C19.1923 25.4316 19.0598 25.5799 18.9024 25.6984C18.7451 25.8169 18.5659 25.9033 18.3751 25.9525C18.1844 26.0017 17.9858 26.0129 17.7907 25.9854C17.5957 25.9579 17.4079 25.8923 17.2382 25.7922C17.0685 25.6922 16.9202 25.5597 16.8017 25.4023C16.6832 25.2449 16.5969 25.0657 16.5476 24.875C15.8326 22.0963 13.0176 20 10.0001 20C6.98263 20 4.16763 22.095 3.45263 24.875C3.40338 25.0657 3.31705 25.2449 3.19856 25.4023C3.08006 25.5597 2.93173 25.6922 2.76203 25.7922C2.59234 25.8923 2.40459 25.9579 2.20952 25.9854C2.01445 26.0129 1.81587 26.0017 1.62513 25.9525C1.43438 25.9033 1.2552 25.8169 1.09782 25.6984C0.940445 25.5799 0.807945 25.4316 0.707889 25.2619C0.607834 25.0922 0.542184 24.9045 0.514686 24.7094C0.487188 24.5143 0.498381 24.3157 0.547627 24.125C1.22013 21.5125 3.05888 19.355 5.43638 18.125C4.51784 17.2198 3.88933 16.0618 3.63082 14.7983C3.3723 13.5349 3.49545 12.2231 3.98462 11.0299C4.47378 9.83661 5.30684 8.81584 6.37781 8.09741C7.44878 7.37898 8.70925 6.99536 9.99888 6.99536C11.2885 6.99536 12.549 7.37898 13.6199 8.09741C14.6909 8.81584 15.524 9.83661 16.0131 11.0299C16.5023 12.2231 16.6255 13.5349 16.3669 14.7983C16.1084 16.0618 15.4799 17.2198 14.5614 18.125C16.9414 19.3562 18.7801 21.5138 19.4526 24.125ZM10.0001 17C10.6924 17 11.3691 16.7947 11.9446 16.4101C12.5202 16.0256 12.9688 15.4789 13.2337 14.8394C13.4986 14.1999 13.5679 13.4961 13.4329 12.8172C13.2978 12.1383 12.9645 11.5146 12.475 11.0251C11.9855 10.5356 11.3619 10.2023 10.6829 10.0673C10.004 9.9322 9.30028 10.0015 8.66074 10.2664C8.02119 10.5313 7.47457 10.9799 7.08998 11.5555C6.7054 12.1311 6.50013 12.8078 6.50013 13.5C6.50013 13.9596 6.59066 14.4148 6.76655 14.8394C6.94244 15.264 7.20025 15.6499 7.52525 15.9749C8.18163 16.6313 9.07187 17 10.0001 17Z"
                  fill="#F75555"
                />
              </g>
              <defs>
                <clipPath id="clip0_7171_64383">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <span className="text-[20px] font-bold">User Profile</span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center lg:justify-between lg:flex-row gap-y-4 lg:gap-y-0">
          <div>Reg No:{data?.registrationNumber}</div>

          <Button
            className="flex h-10 w-auto items-center gap-2 bg-lightpink active:bg-primary"
            onClick={() => {
              setOpen(true);
              typeRef.current = "delete";
            }}
          >
            Delete
            <Trash2 size={12} />
            {/* {isLoading ? <Spinner size="2" loading={true} /> : <>Log In</>} */}
          </Button>
        </div>
        <div className="mt-5 flex lg:flex-row flex-col-reverse w-full items-start gap-5">
          {/* <div className="w-full  p-2 lg:w-1/4">
              <ProfileDetails />
            </div> */}
          <AboutUser name ={data.name} dob={data.dob} gpa={data.gpa} major={data.major}/>
        </div>
      </div>
      <Modal open={open} setOpen={() => setOpen(false)}>
        <DeleteModal
          type={typeRef.current}
          close={() => setOpen(false)}
          handleDelete={() => {}}
          text="Do you to permanently delete this user Anthony Gordon? "
        />
      </Modal>
    </section>
  );
};

export default SingleUser;
