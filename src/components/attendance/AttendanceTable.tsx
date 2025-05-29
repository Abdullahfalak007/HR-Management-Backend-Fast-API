// // src/components/attendance/AttendanceTable.tsx
// import Image from "next/image";
// import { AttendanceRecord } from "@/types/types";

// type Props = {
//   records: AttendanceRecord[];
// };

// export default function AttendanceTable({ records }: Props) {
//   return (
//     <div className="overflow-auto border border-[var(--border)] rounded-lg">
//       <table className="min-w-full text-[var(--text-primary)] text-sm">
//         <thead className="border-b border-[var(--border)]">
//           <tr>
//             <th className="px-4 py-3 text-left">Employee</th>
//             <th className="px-4 py-3 text-left">Designation</th>
//             <th className="px-4 py-3 text-left">Type</th>
//             <th className="px-4 py-3 text-left">Check In</th>
//             <th className="px-4 py-3 text-left">Check Out</th>
//             <th className="px-4 py-3 text-left">Status</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-[var(--border)]">
//           {records.map((r) => (
//             <tr key={r.id} className="hover:bg-[var(--surface)] transition">
//               <td className="px-4 py-3 flex items-center space-x-2">
//                 <Image
//                   src={r.employee.avatar || "/assets/icons/default-avatar.png"}
//                   alt="avatar"
//                   width={30}
//                   height={30}
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span>{r.employee.name}</span>
//               </td>
//               <td className="px-4 py-3">{r.employee.designation}</td>
//               <td className="px-4 py-3">{r.employee.type}</td>
//               <td className="px-4 py-3">{r.checkIn}</td>
//               <td className="px-4 py-3">{r.checkOut}</td>
//               <td className="px-4 py-3">
//                 <span
//                   className={`text-xs px-2 py-1 rounded ${
//                     r.status === "ON_TIME"
//                       ? "bg-[var(--success)]"
//                       : r.status === "LATE"
//                       ? "bg-[var(--warning)]"
//                       : "bg-[var(--error)]"
//                   } text-[var(--text-primary)]`}
//                 >
//                   {r.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// src/components/attendance/AttendanceTable.tsx
import { AttendanceRecord } from "@/types/types";
import Image from "next/image";

export default function AttendanceTable({
  records,
}: {
  records: AttendanceRecord[];
}) {
  return (
    <div className="overflow-x-auto border border-[var(--border)] rounded-lg">
      <table className="min-w-full table-auto text-[var(--text-primary)] text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr>
            <th className="px-4 py-3 text-left whitespace-nowrap">Employee</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">
              Designation
            </th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Type</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Check In</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Check Out</th>
            <th className="px-4 py-3 text-left whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {records.map((r) => (
            <tr key={r.id} className="hover:bg-[var(--surface)] transition">
              <td className="px-4 py-3 flex items-center space-x-2 whitespace-nowrap">
                <Image
                  src={r.employee.avatar || "/assets/icons/default-avatar.png"}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full"
                />
                <span>{r.employee.name}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {r.employee.designation}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{r.employee.type}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.checkIn}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.checkOut}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    r.status === "ON_TIME"
                      ? "bg-[var(--success)]"
                      : r.status === "LATE"
                      ? "bg-[var(--warning)]"
                      : "bg-[var(--error)]"
                  } text-[var(--text-primary)]`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
