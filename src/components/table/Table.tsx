// Style 
import styles from './Table.module.css';
// Mui
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReportIcon from '@mui/icons-material/Report';
// Data 
import data from "../../data/data.json";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import dayjs from 'dayjs'
import { useEffect } from 'react';
import { Campaign } from '../../models/Campaing';
import { useDispatch } from 'react-redux';
import { addCampaign } from '../../features/addCampaigns/AddCampaignsSlice';


// Column Identification
const columns: GridColDef[] = [
    { field: 'id', 
      headerName: 'ID', 
      flex: 1,
    },
    { field: 'name', 
      headerName: 'First Name', 
      flex: 1,
    },
    { 
      field: 'startDate', 
      headerName: 'Start Date', 
      type: 'date', 
      flex: 1,
      valueGetter: (params) => {
        return new Date(params.row.startDate);
      },
    },
    { 
      field: 'endDate', 
      headerName: 'End Date', 
      type: 'date', 
      flex: 1,
      valueGetter: (params) => {
        return new Date(params.row.endDate);
      },
    },
    { 
        field: 'Budget', 
        headerName: 'Budget',
        flex: 1,
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      type: 'string',
      flex: 1,
      renderCell: (params: { row: { status: string } }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.status === 'Active' ? (
            <CheckBoxIcon color="success" />
          ) : (
            <ReportIcon color="error" />
          )}
          {params.row.status}
        </div>
      ),
    },
  ];

export default function CampaignsTable() {

  const dispacth = useDispatch();

  const searchText = useSelector((state: RootState) => state.search.text);
  const startDate = useSelector((state: RootState) => state.date.startDate);
  const endDate = useSelector((state: RootState) => state.date.endDate);
  const addedRows = useSelector((state: RootState) => state.campaigns.campaigns);


  useEffect(() => {
    (window as any).AddCampaigns = function (data: Array<Campaign> = []) {
      const dateControl = data.filter((item) => {
        return (
          new Date(item.endDate).getTime() > new Date(item.startDate).getTime()
        );
      });

      dateControl.forEach((campaign: Campaign) => {
        dispacth(addCampaign(campaign));
      });
    };
  }, [dispacth]);


const mergedRows= data.campaigns.concat(addedRows)

  let rows = mergedRows.filter((row) => {
    const nameSearch =
      !searchText ||
      Object.values(row).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      );
      return nameSearch 
  });

  const addStatus = rows.map((existRows) => {
    const hasStartDate = existRows.startDate != null;
    const hasEndDate = existRows.endDate != null;
  
    if (hasStartDate && hasEndDate) {
      const isAfterStartDate = dayjs(existRows.startDate).isAfter(dayjs(startDate)) || dayjs(existRows.startDate).isSame(dayjs(startDate), 'day');
      const isBeforeEndDate = dayjs(existRows.endDate).isBefore(dayjs(endDate)) || dayjs(existRows.endDate).isSame(dayjs(endDate), 'day');

      if(!startDate && isBeforeEndDate){
        return {
          ...existRows,
          status: "Active",
        };
      }else if(!endDate && isAfterStartDate){ 
        return {
          ...existRows,
          status: "Active",
        };
      }else if (isBeforeEndDate && isAfterStartDate)  {
        return {
          ...existRows,
          status: "Active",
        };
      }
    }
  
    return {
      ...existRows,
      status: "Not Active",
    };
  });
  
  const filteredRows: Campaign[] = addStatus.filter((existRows) => {
    const hasStartDate = existRows.startDate != null;
    const hasEndDate = existRows.endDate != null;
  
    if (hasStartDate && hasEndDate) {
      return dayjs(existRows.endDate).isAfter(dayjs(existRows.startDate));
    }

    return true;
  });


console.log(filteredRows)


  return (
    <div className={styles.wrapperTable}>
        <div className={styles.containerTable}>
        <Box sx={{ display: "flex", marginTop: 5 }}>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
             </Box>
        </div>
    </div>
  );
}
