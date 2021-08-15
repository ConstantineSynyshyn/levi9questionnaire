import type { NextPage } from "next";
import styled from "styled-components";

const HomePageBanner = styled.div`
  background-color: rebeccapurple;
`;
const Home: NextPage = () => {
  return <HomePageBanner> Home Page</HomePageBanner>;
};

export default Home;
