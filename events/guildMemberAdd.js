module.exports = async (client, member) => {
    if (client.setup.has(member.guild.id) && client.setup.has(member.guild.id,  'joinroleID')) { 
        let role = await client.setup.get(member.guild.id, 'joinroleID')
        if (!role) return;
        member.roles.add(role)

    }
}