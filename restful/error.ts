import express from "express";

export function errorHandler(
  error: any,
  req: express.Request,
  res: express.Response
) {
  // for logging errors

  let result = {
    ok: false,
    isErr: true,
    errMess: `${error.message} - ${req.route.path}`,
    error: `${error.message} - ${req.route.path}`,
    data: null,
  };

  // res.status(500).json(result)
  res.json(result);
}
