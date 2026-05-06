export async function GET(req, { params }) {
  await connectDB();

  const data = await Location.findOne({ slug: params.slug }).populate("parent");

  return NextResponse.json(data);
}
