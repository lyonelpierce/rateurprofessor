export async function POST(req: Request) {
  const pathname = new URL(req.url).pathname;
  const id = pathname.split("/university/")[1];

  console.log(req.body);
}
