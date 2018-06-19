UNAME := $(shell uname -s)
ifeq ($(UNAME),Linux)
		CCFLAGS += -D LINUX
endif
ifeq ($(UNAME),Darwin)
		CCFLAGS += -D OSX
endif
APPNAME ?= homework_helper

venv: venv/bin/activate

venv/bin/activate: requirements.txt
		test -d venv || virtualenv venv
		venv/bin/pip3 install -Ur requirements.txt
		touch venv/bin/activate

create_db: init.sql
	createdb $(APPNAME)
	psql -d $(APPNAME) -a -w -f ./init.sql

run: venv
	venv/bin/python3 run.py

clean: clean-pyc
	rm -rf venv

clean-pyc:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -type d -name __pycache__ -exec rm -r {} \+

.PHONY: clean clean-pyc run venv

