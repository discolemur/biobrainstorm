#! /bin/bash

forever app.js >> /root/biobrainstorm/server.log 2>&1 &
