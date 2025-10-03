import { Camera } from "../../../icons";
interface avatarProps {
  avatar?: string | null;
  userName: string;
  userSurname: string;
  size: number;
}

export default function Avatar({
  avatar,
  userName,
  userSurname,
  size,
}: avatarProps) {
  const getInitials = (name: string, surname: string) => {
    if (name && surname) {
      return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
    }
    if (name) {
      return name.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  const initials = getInitials(userName, userSurname);
  const avatarSize = { width: size, height: size };

  // Calcola la dimensione del font in base alla grandezza dell'avatar
  const fontSize = size / 2.5;

  return (
    <div className="flex justify-center items-center">
      <div
        style={avatarSize}
        className="relative inline-flex flex-shrink-0 cursor-pointer "
      >
        <div
          className="w-full h-full rounded-full flex overflow-hidden
                   border-2 border-gray-400 dark:border-white bg-gray-200
                   dark:bg-gray-800 justify-center items-center"
        >
          {avatar ? (
            // Usiamo w-full e h-full per riempire il contenitore
            <img
              className="w-full h-full object-cover"
              src={avatar}
              alt={`${userName} ${userSurname}`}
            />
          ) : (
            <div style={{ fontSize }} className="font-semibold text-white">
              {initials}
            </div>
          )}
        </div>

        <div
          className="absolute bottom-0 right-0
                   transform translate-x-1 translate-y-1
                   text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-700 p-[3px]
                   rounded-full border border-gray-300 dark:border-gray-600"
        >
          <Camera className="size-5" />
        </div>
      </div>
    </div>
  );
}

// interface avatarProps {
//   avatar?: string | null;
//   userName: string;
//   userSurname: string;
//   size: number;
// }

// export default function Avatar({
//   avatar,
//   userName,
//   userSurname,
//   size,
// }: avatarProps) {
//   const getInitials = (name: string, surname: string) => {
//     if (name && surname) {
//       return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
//     }
//     if (name) {
//       // Potresti voler mostrare solo la prima iniziale o al massimo due lettere
//       return name.substring(0, 2).toUpperCase();
//     }
//     return "?";
//   };

//   const initials = getInitials(userName, userSurname);
//   const avatarSize = { width: size, height: size };

//   // Calcola la dimensione del font in base alla grandezza dell'avatar
//   // Abbiamo reso il calcolo più robusto usando Math.floor
//   const fontSize = Math.floor(size / 2.5);

//   return (
//     <div
//       style={avatarSize}
//       className="rounded-full overflow-hidden border-2 border-white bg-gray-800 flex  justify-center items-center"
//     >
//       {avatar ? (
//         <img
//           style={avatarSize}
//           src={avatar}
//           className="w-full h-full object-cover"
//         />
//       ) : (
//         <div style={{ fontSize }} className="font-semibold text-white">
//           {initials}
//         </div>
//       )}
//     </div>

//   );
// }
