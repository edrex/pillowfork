#!/bin/bash

# requires patched s3cmd from github
# https://github.com/s3tools/s3cmd/issues/243
s3cmd sync --default-mime-type="text/html; charset=utf-8" --guess-mime-type --delete-removed public/ s3://rewrite.pdxhub.org/