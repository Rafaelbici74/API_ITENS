const express = require("express");
const router = express.Router();
const itensController = require("../controllers/itensController");

router.get("/", itensController.getItens);
router.get("/:id", itensController.getItensId);
router.post("/", itensController.postItens);
router.put("/", itensController.putItens);
router.put("/:id/devolver", itensController.putItensStatus);
router.delete("/:id", itensController.deleteItens);

module.exports = router;
