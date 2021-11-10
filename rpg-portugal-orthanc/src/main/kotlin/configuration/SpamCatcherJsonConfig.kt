package org.rpgportugal.orthanc.configuration

data class SpamCatcherJsonConfig(val trapWarnChannelPairs: Map<Long, Long>,
                                 val ignoreRoleIds: List<Long>,
                                 val linkPattern: String,
                                 val messageToSend: String)