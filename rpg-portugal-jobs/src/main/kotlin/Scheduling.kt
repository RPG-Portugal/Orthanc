package org.rpgportugal.jobs

import com.coreoz.wisp.Scheduler
import com.coreoz.wisp.SchedulerConfig
import com.coreoz.wisp.schedule.cron.CronSchedule

object Scheduling {
    private val defaultConfig =
        SchedulerConfig.builder()
            .minThreads(2)
            .maxThreads(15)
            .build()

    private val scheduler = createScheduler()

    private fun createScheduler(config: SchedulerConfig = defaultConfig): Scheduler =
        Scheduler(config)

    fun schedule(jobInfo: JobInfo, tryGetJobByType: (String) -> JobType?) {
        val jobFunction = tryGetJobByType(jobInfo.type)
        if(jobFunction != null) {
            val runnable = Runnable {
                jobFunction(jobInfo.args)
            }
            val cron = CronSchedule.parseQuartzCron(jobInfo.cron)
            scheduler.schedule(jobInfo.name, runnable, cron)
        }
    }

}