import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { readExcelFile } from '../utils/excelUtils';
import { query, addDoc,collection, getDocs, orderBy } from '@firebase/firestore';
import { firestore } from '../firebase';

import './ExcelUploader.css'; // Import the CSS file

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Define the type for your Firestore data
type FirestoreData = {
  Id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  mobile: string;

  [key: string]: number | string;
  // ... add other fields as needed
};

const ExcelUploader: React.FC = () => {
  const [excelData, setExcelData] = useState<FirestoreData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const data = await readExcelFile(file);
      setExcelData(data);
    }
  };

  const uploadDataToFirestore = async () => {
    for (const item of excelData) {
      const validData = Object.fromEntries(
        Object.entries(item).filter(([key, value]) => value !== undefined)
      );

      if (Object.keys(validData).length > 0) {
        await addDoc(collection(firestore, 'Mock'), validData);
      }
    }

    // Optional: Reset state after uploading
    setExcelData([]);
  };
  const fetchFirestoreData = async () => {
    const fetchedData: FirestoreData[] = [];
    const q = query(collection(firestore, 'Mock'), orderBy('Id'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      fetchedData.push(doc.data() as FirestoreData);
    });
  
    // Ensure keys are in the desired order (id, name, mobile)
    const reorderedData = fetchedData.map(({ Id, first_name,last_name,email,gender,address, mobile }) => ({  Id, first_name,last_name,email,gender,address, mobile  }));
    setExcelData(reorderedData);
  };
  const showUploadedData = () => {
    fetchFirestoreData();
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    fetchFirestoreData(); // You can modify this to perform the search logic
  };

  const filteredData = excelData.filter((item) => {
    if (typeof item.first_name === 'string') {
      return item.first_name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  
    return false; // or handle the case where item.first_name is not a string
  });
  
  const acceptedFileTypes: string[] = ['.xls', '.xlsx'];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.join(',') as any,
  });
  

  
  
  
  

  return (
    <div className="uploader-container">
      <div {...getRootProps()} className="dropzone" style={dropzoneStyles as React.CSSProperties}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Excel file here, or click to select one</p>
      </div>

      <div>
        <Button variant="contained" onClick={showUploadedData}>
          Show Uploaded Data
        </Button>
      </div>
<br/>
      <TextField
        label="Search by Name"
        variant="outlined"
        onChange={handleSearchChange}
      />

      <IconButton onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>

      {filteredData.length > 0 && (
        <div>
          <h3>Filtered Data</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(filteredData[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    {Object.keys(item).map((key) => (
                      <TableCell key={key}>{String(item[key])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={uploadDataToFirestore}>
            Upload to Firestore
          </Button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles: unknown = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ExcelUploader;
