set -e 
cd frontend
npm run build
cd ..
scp -r ./frontend/build outrage@51.250.90.71:/home/outrage/react-mesto-api-full/frontend