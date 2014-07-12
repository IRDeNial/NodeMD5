#!/usr/bin/env python

import urllib2
from bs4 import BeautifulSoup
import re
import sys
from pymongo import MongoClient;

cl = MongoClient()
coll = cl["md5list"]["md5"]

fdurl = urllib2.urlopen('http://hashkiller.co.uk')

soup = BeautifulSoup(fdurl.read())
for row in soup.find_all("div", class_="table"):
	md5Hash = ""
	value = ""
	i = 0
	j = 1
	skip = False

	for div in row.find_all():
		if skip != True:
			if i == 3:
				if div.string != "MD5":
					skip = True
			if i == 1:
				if div.string == "Hash":
					skip = True
			if i == 2:
				md5Hash = div.string.encode()
			if i == 4:
				value = div.string.encode()

		if i == 6:
			i = 0
			if skip == False:
				coll.update({'hash': md5Hash}, {
					'hash': md5Hash,
					'text': value
				}, True);

				print md5Hash + " - " + value
			else:
				skip = False
		else:
			i += 1

fdurl.close()