select l.bird from log l where l.bird like '%$1%';




 with main as (
        select l.bird
            ,sighting_time
            ,row_number() over (partition by l.bird order by us.sighting_time asc) as row_num
        from log l
        left join user_sighting us on l.birdid = us.birdref
        and us.userid = $1
        left join user_list ul on us.listid = ul.listid
        order by l.family_rank
    ) 
    select main.bird, main.sighting_time 
    from main
    where main.row_num = 1;