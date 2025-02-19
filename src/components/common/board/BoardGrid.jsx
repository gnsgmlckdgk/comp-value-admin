import React, { forwardRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { motion } from 'framer-motion';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const BoardGrid = forwardRef((props, ref) => {

    const { rowData, columnDefs, rowSelection, onCellClicked, onPaginationChanged, pagination, paginationPageSize, paginationPageSizeSelector } = props;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="ag-theme-alpine"
            style={{ height: '500px', width: '100%' }}
        >
            <AgGridReact
                ref={ref}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ flex: 1, resizable: true }}
                rowSelection={rowSelection}
                onCellClicked={onCellClicked}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                onPaginationChanged={onPaginationChanged}
            />
        </motion.div>
    );
});

export default BoardGrid;
