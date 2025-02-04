import React from "react";
import { Button } from "./ui/button";
import {
  LockKeyhole,
  LockKeyholeOpen,
  Trash2,
  UserMinus,
  UserPlus,
} from "lucide-react";

const Toolbar = () => {
  return (
    <div className="flex gap-3 flex-wrap rounded-md border p-3 mb-5">
      <Button>
        <LockKeyhole /> Block
      </Button>
      <Button>
        <LockKeyholeOpen />
      </Button>
      <Button variant="destructive">
        <Trash2 />
      </Button>
      <Button>
        <UserPlus /> Make Admin
      </Button>
      <Button>
        <UserMinus /> Remove Admin
      </Button>
    </div>
  );
};

export default Toolbar;
