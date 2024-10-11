"use client";
import useStudents from "@/hooks/useStudents";
import { Students } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../molecules/Modals/ModalBackground";
import DeleteModal from "../molecules/Modals/DeleteModal/DeleteModal";
import { Spinner, useToast } from "@chakra-ui/react";

const UsersTables = () => {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const typeRef = useRef<"delete" | "update">("delete");
  const idRef = useRef<string>("");
  const { addStudent, getStudent, deleteStudent } = useStudents();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["students"],
    queryFn: getStudent,
    // You can set enabled to false if you want to control when the query runs
    enabled: true,
  });
  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      console.log("Data submitted successfully:");
      toast({
        title: `Student Added Successfully`,
        status: "success",
        position: "top",
        isClosable: true,
      });
      refetch();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // You can add additional actions on success, e.g., show a success message or navigate.
    },
    onError: (error: any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    },
  });
  const handleDeleteStudent = () => {
    mutation.mutate(idRef.current);
  };

  console.log(data);
  let itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: any }) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  if (isFetching) {
    <div className="flex justify-center items-center w-full">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </div>
  }
  return (
    <div>
      <div className="h-auto w-full overflow-auto bg-white shadow-xl">
        <table className="no-scrollbar w-full overflow-scroll leading-normal lg:overflow-hidden">
          <thead>
            <tr className="border-gray-400 border-b bg-white">
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                S/N
              </th>

              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Name
              </th>
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Reg No.
              </th>
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Major
              </th>
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Date of Birth
              </th>
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                GPA
              </th>

              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Actions
              </th>
            </tr>
          </thead>

          {currentItems && (
            <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gold [&>*:nth-child(odd)]:text-white">
              {currentItems?.map(
                (
                  item: {
                    _id: React.Key | null | undefined;
                    name:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    registrationNumber:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    major:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    dob:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    gpa:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  index: number
                ) => (
                  <tr key={item?._id} className="">
                    <td className="px-5 py-3 text-sm">{index + 1}</td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.name}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.registrationNumber}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.major}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.dob}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.gpa}
                    </td>

                    <td className="flex items-center px-5 py-3 text-sm">
                      <button
                        onClick={() => {
                          //handleDeleteStudent()
                          idRef.current = item._id?.toString()!;
                          setOpen(true);
                          typeRef.current = "delete";
                        }}
                        className={`whitespace-no-wrap text-md text-Hwhite cursor-pointer rounded-md p-2 font-semibold`}
                      >
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                            fill="red"
                            fill-opacity="0.8"
                          />
                        </svg>
                      </button>
                      <Link
                        href={`/overview/${item._id}`}
                        className={`whitespace-no-wrap text-md text-Hwhite ml-3 cursor-pointer rounded-md p-2 font-semibold underline`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          )}
        </table>
        <Modal open={open} setOpen={() => setOpen(false)}>
          <DeleteModal
            type={typeRef.current}
            close={() => setOpen(false)}
            handleDelete={handleDeleteStudent}
            text="Do you to permanently delete this student? "
          />
        </Modal>
      </div>
      <ReactPaginate
        breakLabel="....."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-item"
        previousLinkClassName="previous-link"
        nextClassName="next-item"
        nextLinkClassName="next-link"
        breakClassName="break-item"
        breakLinkClassName="break-link"
        activeClassName="active"
      />
    </div>
  );
};

export default UsersTables;
