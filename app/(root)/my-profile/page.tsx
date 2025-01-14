import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { signOut } from "@/auth";

const MyProfile = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        style={{ "margin-bottom": "45px" }}
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default MyProfile;
