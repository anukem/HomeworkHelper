clean:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -type d -name __pycache__ -exec rm -r {} \+

install: requirements.txt
	source venv/bin/activate; \
	pip3 install -r requirements.txt; \

run:
	source venv/bin/activate; \
	python3 run.py; \

.PHONY: clean-pyc

