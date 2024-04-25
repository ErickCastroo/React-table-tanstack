import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  FaSortAlphaDownAlt,
  FaSortAlphaUp,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { useState } from "react";
import data from "../Datos/MOCK_DATA.json";
import dayjs from "dayjs";
function Simpletable() {
  const columnas = [
    {
      header: "ID",
      accessorKey: "id",
    },

    {
      header: "Nombre",
      accessorKey: "name",
    },

    {
      header: "Apellido",
      accessorKey: "lastname",
    },

    {
      header: "Correo",
      accessorKey: "email",
    },


    {
      header: "Fecha de nacimiento",
      accessorKey: "dayOfbirth",
      footer: "mi fecha de nacimiento",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  const table = useReactTable({
    data,
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
  });

  return (
    <div>
      <div className="form">
        <input
          className="input"
          placeholder="Buscar"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <span className="input-border"></span>
      </div>

      <table>
        <thead className="pointer">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    
                    {{ asc: <FaSortAlphaUp />, desc: <FaSortAlphaDownAlt /> }[
                        header.column.getFirstSortDir()
                      ] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* <tfoot>
          {
            table.getFooterGroups().map((footerGroup)=>(
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => (
                  <th key={footer.id}>
                  {
                    flexRender(
                      footer.column.columnDef.footer,
                      footer.getContext()
                    )
                  }
                  </th>
                ))}
              </tr>
            ))
          }
        </tfoot> */}
      </table>
      <button onClick={() => table.setPageIndex(0)}>
        {" "}
        <MdFirstPage />{" "}
      </button>

      <button onClick={() => table.previousPage()}>
        <FaArrowLeft />
      </button>

      <button onClick={() => table.nextPage()}>
        <FaArrowRight />
      </button>

      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        {" "}
        <MdLastPage />{" "}
      </button>
    </div>
  );
}

export default Simpletable;
