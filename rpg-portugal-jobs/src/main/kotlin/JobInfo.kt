package org.rpgportugal.jobs

data class JobInfo(val type: String, val name: String, val cron: String, val args: Map<String, Any>)