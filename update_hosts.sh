#!/bin/bash

# Get content of current hosts file
CURRENT_HOSTS=$(cat /etc/hosts)
# Find the line number of the hosts file including pattern of # GitHub Host Start
HOSTS_START=$(echo "$CURRENT_HOSTS" | grep -n "# GitHub Host Start" | cut -d: -f1)
# Find the line number of the hosts file including pattern of # GitHub Host End
HOSTS_END=$(echo "$CURRENT_HOSTS" | grep -n "# GitHub Host End" | cut -d: -f1)
# Get the content of the updated hosts file from https://gitee.com/ineo6/hosts/raw/master/hosts
UPDATED_HOSTS=$(curl -s https://gitee.com/ineo6/hosts/raw/master/hosts)
# Handle the case if the hosts file does not contain the pattern
if [ -z "$HOSTS_START" ] || [ -z "$HOSTS_END" ]; then
	NEW_HOSTS=$(echo -e "$CURRENT_HOSTS\n$UPDATED_HOSTS")
else
	# Get the content of the hosts file before # GitHub Host Start
	BEFORE_HOSTS=$(echo "$CURRENT_HOSTS" | head -n $(expr $HOSTS_START - 1))
	# Get the content of the hosts file after # GitHub Host End
	AFTER_HOSTS=$(echo "$CURRENT_HOSTS" | tail -n +$(expr $HOSTS_END + 1))
	# Replace the content of the hosts file between # GitHub Host Start and # GitHub Host End with the updated hosts file
	NEW_HOSTS=$(echo -e "$BEFORE_HOSTS\n$UPDATED_HOSTS\n$AFTER_HOSTS")
fi

echo "$NEW_HOSTS" | tee /etc/hosts
