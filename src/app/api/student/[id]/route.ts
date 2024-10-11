import dbConnect from "@/lib/db";
import { response } from "@/lib/res";
import Student from "@/schema/userSchema/studentSchema";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const id = params.id;
  console.log("id", id);
  if (!id) {
    return response(400, "Select a Student");
  }
  const student = await Student.findOne({ _id: id }).exec();

  if (!student) {
    return response(204, `No Student with ${id} found`);
  }
  const result = await student.deleteOne({ _id: id });
  console.log(result);
  return response(201, "Student deleted successfully");
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const id = params.id;
  if (!id) {
    return response(400, "No Student Found");
  }
  const student = await Student.findOne({ _id: id }).exec();
  if (!student) {
    return response(204, `No Student with ${id} found`);
  }
  return response(201, "User fetched successfully", student);
}
