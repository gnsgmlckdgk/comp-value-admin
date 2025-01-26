import styled from 'styled-components';
// import { useState } from 'react';

const LoadingOverlay = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
`;

const Spinner = styled.div`
 border: 4px solid #f3f3f3;
 border-top: 4px solid #3498db;
 border-radius: 50%;
 width: 40px;
 height: 40px;
 animation: spin 1s linear infinite;
 
 @keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
 }
`;

export { LoadingOverlay, Spinner }

// Sample
// function Form() {
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async () => {
//         setIsLoading(true);
//         try {
//             await axios.post('/api/data');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
                
//             </form>
//             {isLoading && (
//                 <LoadingOverlay>
//                     <Spinner />
//                 </LoadingOverlay>
//             )}
//         </>
//     );
// }