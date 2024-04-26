import React from "react";
import { LeftSideMenu } from "./LeftSideMenu";
import { PostWall } from "./PostWall";
import { RightSideMenu } from "./RightSideMenu";

export const BaseContainer = () => {
  return (
    <section className="flex flex-row justify-center">
      <LeftSideMenu />
      <PostWall />
      <RightSideMenu />
    </section>
  );
};
