import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

import Container from "react-bootstrap/Container";
import Table from "@/components/users/Table";

import { User } from "@/types/User";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req } = context;
    const session = await getSession({ req: req });

    if (!session) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }

    return {
      props: { user: session.user },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function Dashboard({ user }: { user: User }) {
  return (
    <>
      <Container>
        <Table userRole={user.role} />
      </Container>
    </>
  );
}
