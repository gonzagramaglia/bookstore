import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  // Fetch data based on id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);
  if (!bookDetails) redirect("/404");
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          {/* <section className="my-10 flex flex-col gap-7">
            <h3 className="my-10">Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section> */}
          <section className="flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </section>
        </div>
        {/* SIMILAR BOOKS */}
      </div>
    </>
  );
};

export default Page;
