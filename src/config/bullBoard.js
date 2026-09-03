const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const fileQueue = require("../queue/fileQueue");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
    queues: [new BullMQAdapter(fileQueue)],
    serverAdapter,
});

module.exports = serverAdapter;