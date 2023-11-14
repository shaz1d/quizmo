import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
type Props = {
  user: Pick<User, "name" | "image" | "email" | "id">;
};

const UserNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Image
          src={user.image as string}
          alt={user.name as string}
          width={40}
          height={40}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div>
            <p className="text-base font-medium">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton text="Sign Out" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
