import { Router } from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
function getCurrentDirectory() {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
}

const __dirname = getCurrentDirectory()
const router = Router()

router.get('/api/images/moby/:image', (req, res) => {
  if(!req.params.image.includes('.png')) return res.status(404).end()
  
  res.sendFile('./' + req.params.image)
})

export default router