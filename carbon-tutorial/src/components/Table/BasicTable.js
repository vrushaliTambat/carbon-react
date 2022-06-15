import React, { useEffect, useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  Pagination
  // TableToolbarSearch,
  // TableToolbarContent,
  // TableToolbarAction
} from 'carbon-components-react';

const headers = [
  {
    key: 'firstName',
    header: 'First Name',
    isSortable: true
  },
  {
    key: 'lastName',
    header: 'Last Name',
    isSortable: true
  },
  {
    key: 'email',
    header: 'Email',
    isSortable: true
  },
  {
    key: 'role',
    header: 'Role',
    isSortable: false
  },
];

const BasicTable = () => {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/pagination?search=${search}&page=${page}&pageSize=${pageSize}`)
      .then(data => data.json())
      .then(json => {
        const { tableData, pagination } = json,
          { totalRecords } = pagination;
        setTableData(tableData);
        setTotalRecords(totalRecords);
      });
  }, [search]);

  const onSearchClick = (event) => {
    fetch(`http://localhost:8080/pagination?search=${search}&page=${page}&pageSize=${pageSize}`)
      .then(data => data.json())
      .then(json => {
        const { tableData, pagination } = json,
          { totalRecords } = pagination;
        setTableData(tableData);
        setTotalRecords(totalRecords);
      });
  }

  const onSearchType = (event) => {
    const _search = event.target.value;
    setSearch(_search);
  }

  const handlePagination = (x) => {
    console.log("PAGINATION CALLED", x);
    const { page, pageSize } = x;
    setPage(page);
    setPageSize(pageSize);
    fetch(`http://localhost:8080/pagination?search=${search}&page=${page}&pageSize=${pageSize}`)
      .then(data => data.json())
      .then(json => {
        const { tableData, pagination } = json,
          { totalRecords } = pagination;
        setTableData(tableData);
        setTotalRecords(totalRecords);
      });
  };

  const customSortRow = (obj) => {
    console.log('SORTING ENABLED', obj);
  };

  return (
    <DataTable
      rows={tableData}
      headers={headers}
      isSortable
      render={({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <TableContainer title="DataTable with toolbar">
          <TableToolbar>
            <div className="wrap">
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  onChange={onSearchType}
                  placeholder="What are you looking for?" />
                <button className="searchButton" onClick={onSearchClick}>
                  Search
                </button>
              </div>
            </div>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => {
                  const { isSortable } = header;
                  return (
                    <TableHeader onClick={customSortRow}  {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            onChange={handlePagination}
            page={page}
            pageSize={pageSize}
            pageSizes={[
              5,
              10,
              15
            ]}
            size="md"
            totalItems={totalRecords}
          />
        </TableContainer>
      )} />
  );
};

export default BasicTable;
