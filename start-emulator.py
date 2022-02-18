#!/usr/bin/env python
import os
import sys
import subprocess
from types import new_class

options = {
    "a" : "auth",
    # "db" : "database",
    "f" : "firestore",
    "fn" : "functions",
    "h" : "hosting",
    "s" : "storage"
    # "ps" : "pubsub"
}

firebase = "firebase"

start = "emulators:start"
import_dir = "--import=./firebase-dev/export"
export_on_exit = "--export-on-exit"
debug_flag = "--debug"

only_opt = []

res_command = ["powershell.exe", firebase, start, import_dir, export_on_exit]

argc = len(sys.argv)

if(argc > 1):
    for opt in sys.argv[1::]:
        if opt not in options:
            exit("\033[91mError: Invalid Argument \"" + str(opt) + "\"\033[0m")
        only_opt += [options[opt]]

    only_flag = "--only \"" + ",".join(only_opt) + "\""
    res_command.append(only_flag)

process = subprocess.Popen(res_command, stderr=sys.stderr, stdin=sys.stdin, stdout=sys.stdout)
process.communicate()

sys.exit(process.returncode)
